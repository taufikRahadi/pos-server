import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Inventory } from "../../domain/inventory.domain";
import { ILike, IsNull, Not, Repository } from "typeorm";
import { FileUpload } from 'graphql-upload'
import { createWriteStream } from "fs";
import { UpdateInventoryArgs } from "./inventory.type";
import { checkPage, checkPagination } from "../../utils/check-helper";

@Injectable()
export class InventoryService {

  constructor(@InjectRepository(Inventory) private readonly inventoryRepo: Repository<Inventory>) {}

  async create(payload: Inventory): Promise<Inventory> {
    try {
      return await this.inventoryRepo.save(this.inventoryRepo.create(payload))
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

  async update(id: string, payload: Inventory): Promise<Boolean> {
    try {
      if (!await this.getById(id)) throw new NotFoundException(`Product with id '${id}' was not found.`)

      await this.inventoryRepo.update(id, payload)
      return true
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

  async getAllNotProduced() {
    try {
      return await this.inventoryRepo.find({
        withDeleted: true,
        where: {
          deletedAt: Not(IsNull())
        }
      })
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

  async delete(id: string) {
    try {
      if (!await this.getById(id)) throw new NotFoundException(`Product with id '${id}' was not found.`)

      await this.inventoryRepo.softDelete(id)
      return true
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

  async getAll(query?: string): Promise<Inventory[]> {
    try {
      const where = query ? [
        { category: ILike(`%${query}%`) },
        { name: ILike(`%${query}%`) },
        { id: ILike(`%${query}%`) },
      ] : {}
      return await this.inventoryRepo.find({
        where
      })
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

  async getAllPagination(limit: number = 10, page: number = 1, query?: string): Promise<any> {
    try {
      const where = query ? [
        { category: ILike(`%${query}%`) },
        { name: ILike(`%${query}%`) },
        { id: ILike(`%${query}%`) },
      ] : {}
      const { take, skip } = checkPagination({ limit, skip: page })

      const [data, count] = await this.inventoryRepo.findAndCount({
        where,
        take,
        skip
      })

      const metadata = checkPage(count, { limit: take, skip })

      return {
        metadata,
        data
      }
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

  async getById(id: string): Promise<Inventory> {
    try {
      return await this.inventoryRepo.findOne(id)
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

  async outOfStock(id: string) {
    try {
      const item = await this.getById(id)
      if (!item) throw new BadRequestException(`item with id '${id}' was not found`)
      return await this.inventoryRepo.save({
        id,
        availability: false
      })
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

  async uploadPicture({ createReadStream, mimetype }: FileUpload, fname: string): Promise<string> {
    const [_, ext] = mimetype.split('/')

    return new Promise((resolve, reject) => createReadStream()
      .pipe(createWriteStream(`public/photo/inventory/${fname}.${ext}`))
      .on('finish', async () => {
        resolve(`${fname}.${ext}`)
      })
      .on('error', async (err) => {
        reject(err)
      })
    )
  }

  async notProducedAnymore(id: string) {
    try {
      await this.inventoryRepo.softDelete(id)
      return true
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

}
