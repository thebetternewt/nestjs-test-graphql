import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Request } from 'express';
import { Model } from 'mongoose';
import { formatLocationInput } from 'src/utils/locations';
import { NewNeedInput } from './dto/new-need.input';
import { Need } from './models/need';
import { Args } from '@nestjs/graphql';

@Injectable()
export class NeedsService {
  constructor(@InjectModel('Need') private readonly needModel: Model<Need>) {}

  async findAll(): Promise<Need[]> {
    return await this.needModel.find();
  }

  async findOne(@Args('id') id: string): Promise<Need> {
    return await this.needModel.findById(id);
  }

  async create(needData: NewNeedInput, req: Request): Promise<Need> {
    const { userId } = req.session;
    console.log(needData);
    const newNeed = new this.needModel({
      ...needData,
      recipient: userId,
      location: formatLocationInput(needData.location),
    });

    return await newNeed.save();
  }
}
