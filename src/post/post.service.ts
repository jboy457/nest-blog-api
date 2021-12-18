import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SuccessResponse } from 'src/interfaces/response.interface';
import { PostDto } from './dto/post.dto';
import { Post } from './interfaces/post.interface';

@Injectable()
export class PostService {
  constructor(@InjectModel('Post') private postModel: Model<Post>) {}

  async create(postDto: PostDto): Promise<SuccessResponse> {
    try {
      const post: Post = await this.postModel.create(postDto);
      return {
        status: true,
        message: 'Successfully created post',
        data: post,
      };
    } catch (err) {
      throw err;
    }
  }

  async getById(_id: string): Promise<SuccessResponse> {
    try {
      if (!_id) throw new UnprocessableEntityException();
      const post: Post = await this.postModel.findById(_id);
      if (!post) throw new NotFoundException('Post not found');
      return {
        status: true,
        message: `Successfully fetched post with ${_id}`,
        data: post,
      };
    } catch (err) {
      throw err;
    }
  }

  async getAll(): Promise<SuccessResponse> {
    try {
      const posts: Post[] = await this.postModel.find({});
      return {
        status: true,
        message: 'Successfully fetched posts',
        data: posts,
      };
    } catch (err) {
      throw err;
    }
  }

  async update(_id: string, postDto: PostDto): Promise<SuccessResponse> {
    try {
      await this.postModel.findByIdAndUpdate(_id, postDto);
      return {
        status: true,
        message: 'Successfully updated post',
        data: null,
      };
    } catch (err) {
      throw err;
    }
  }
}
