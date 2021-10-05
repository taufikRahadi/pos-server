import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, Query, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { join } from "path";
import { AuthGuard } from "../../guards/auth.guard";
import { randomString } from "../../utils/random-string";
import { InventoryService } from "./inventory.service";
import { CreateInventoryArgs, UpdateInventoryArgs } from "./inventory.type";
const multer = require('multer')

@Controller('/v1/inventory')
export class InventoryController {

  constructor(private readonly inventoryService: InventoryService) {}

  @Get('/')
  @UseGuards(AuthGuard)
  getAll(
    @Query('query') query: string
  ) {
    return this.inventoryService.getAll(query)
  }

  @Get('/not-produced')
  @UseGuards(AuthGuard)
  getAllNotProduced() {
    return this.inventoryService.getAllNotProduced()
  }

  @Get('/:id')
  @UseGuards(AuthGuard)
  async getById(
    @Param('id') id: string
  ) {
    const data = await this.inventoryService.getById(id)
    if (!data) throw new NotFoundException(`Product with id '${id}' was not found`)

    return data
  }

  @Post('/')
  @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor('picture', {
    storage: multer.diskStorage({
      destination: join(process.cwd(), '/public/photo/inventory'),
      filename: (req, file, cb) => {
        const filename = randomString(12) + '.' + file.mimetype.split('/')[1]
        cb(null, filename)
      }
    })
  }))
  create(
    @Body() payload: CreateInventoryArgs,
    @UploadedFile() file: Express.Multer.File
  ) {
    return this.inventoryService.create({
      ...payload, picture: file.filename
    })
  }

  @Put('/:id')
  @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor('picture', {
    storage: multer.diskStorage({
      destination: join(process.cwd(), '/public/photo/inventory'),
      filename: (req, file, cb) => {
        const filename = randomString(12) + '.' + file.mimetype.split('/')[1]
        cb(null, filename)
      }
    })
  }))
  update(
    @Param('id') id: string,
    @Body() payload: UpdateInventoryArgs,
    @UploadedFile() file: Express.Multer.File
  ) {
    const productUpdate = file ? { ...payload, picture: file.filename } : payload
    return this.inventoryService.update(id, {
      ...productUpdate
    })
  }

  @Delete('/:id')
  @UseGuards(AuthGuard)
  delete(
    @Param('id') id: string
  ) {
    return this.inventoryService.delete(id)
  }

}
