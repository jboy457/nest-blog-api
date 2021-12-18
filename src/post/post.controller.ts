import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  ValidationPipe,
} from '@nestjs/common';
import { SuccessResponse } from 'src/interfaces/response.interface';
import { PostDto } from './dto/post.dto';
import { PostService } from './post.service';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}
  @Get()
  async getPosts(): Promise<SuccessResponse> {
    return await this.postService.getAll();
  }

  @Get(':postId')
  async getPost(@Param('postId') postId: string): Promise<SuccessResponse> {
    return await this.postService.getById(postId);
  }

  @Post()
  async createPost(
    @Body(ValidationPipe) postDto: PostDto,
  ): Promise<SuccessResponse> {
    return await this.postService.create(postDto);
  }

  @Put(':postId')
  async updatePost(
    @Body(ValidationPipe) postDto: PostDto,
    @Param('postId') postId: string,
  ): Promise<SuccessResponse> {
    return await this.postService.update(postId, postDto);
  }

  @Delete(':postId')
  async deletePost(@Param('postId') postId: string): Promise<SuccessResponse> {
    return await this.postService.delete(postId);
  }
}
