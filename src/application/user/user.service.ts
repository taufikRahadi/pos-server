import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { compareSync } from "bcrypt";
import { User } from "../../domain/user.domain";
import { FindManyOptions, ILike, Repository } from "typeorm";
import { checkPage, checkPagination } from "../../utils/check-helper";

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>
  ) {}

  async getAllUser(query?: string): Promise<User[]> {
    try {
      const where = query ?  [
          { fullName: ILike(`%${query}%`) },
          { username: ILike(`%${query}%`) },
          { role: ILike(`%${query}%`) }
        ] : {}

      return await this.userRepo.find({
        where,
        order: {
          createdAt: "ASC"
        }
      })
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

  async getAllUserPagination(limit: number = 10, page: number = 1, query?: string): Promise<any> {
    try {
      const where = query ?  [
          { fullName: ILike(`%${query}%`) },
          { username: ILike(`%${query}%`) },
          { role: ILike(`%${query}%`) }
        ] : {}
      
      const { skip, take } = checkPagination({ limit, skip: page })

      
      const [data, count] = await this.userRepo.findAndCount({
        where,
        order: {
          createdAt: "ASC"
        },
        skip,
        take
      })

      const metadata = checkPage(count, { skip, limit: take })

      return {
        metadata,
        data
      }
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

  async getUserById(id: string) {
    try {
      return await this.userRepo.findOne({
        where: {
          id
        }
      })
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

  async getUserByUsername(username: string): Promise<User> {
    try {
      return await this.userRepo.findOne({
        where: {
          username
        },
        select: ['id', 'fullName', 'username', 'password', 'role']
      })
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

  comparePassword(password: string, hashedPssword: string): boolean {
    const compare = compareSync(password, hashedPssword)

    return compare
  }

  async createUser(user: User): Promise<User> {
    console.log(user)
    try {
      return await this.userRepo.save(this.userRepo.create(user))
    } catch (error) {
      if (error.code === '23505') throw new BadRequestException('Username already used')
      throw new InternalServerErrorException(error)
    }
  }

  async delete(id: string) {
    try {
      const user = await this.userRepo.findOne(id)
      if (!user) throw new NotFoundException(`User with id '${id}' was not found.`)

      return await this.userRepo.softDelete(id)
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

}
