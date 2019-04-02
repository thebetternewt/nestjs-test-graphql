import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ChildcareDetail } from './models/childcareDetail';
import { Args } from '@nestjs/graphql';
import { NewChildcareDetailInput } from './dto/new-childcare-detail.input';

@Injectable()
export class ChildcareDetailsService {
  constructor(
    @InjectModel('ChildcareDetail')
    private readonly childcareDetailModel: Model<ChildcareDetail>,
  ) {}

  async findOne(@Args('id') id: string): Promise<ChildcareDetail> {
    return await this.childcareDetailModel.findById(id);
  }

  async create(
    childcareData: NewChildcareDetailInput,
  ): Promise<ChildcareDetail> {
    console.log(childcareData);
    const newChildcareDetail = new this.childcareDetailModel(childcareData);

    return await newChildcareDetail.save();
  }
}
