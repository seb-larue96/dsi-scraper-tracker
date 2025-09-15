import { Controller, Get, Param, Post } from '@nestjs/common';
import { OffresService } from './offres.service';
import { ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { FindOfferDto } from './dto/find-offer.dto';

@Controller('offres')
export class OffresController {
  constructor(private readonly offresService: OffresService) {}

  @Post('syncOffers')
  @ApiOperation({ summary: 'Fetch and store offers from external API' })
  @ApiResponse({ status: 201, description: 'Offers synced successfully.' })
  fetchFromExternalApi() {
    return this.offresService.fetchAndStore();
  }

  @Get('getOffers')
  @ApiOperation({ summary: 'Get all stored offers' })
  @ApiResponse({ status: 200, description: 'List of all offers', type: [FindOfferDto] })
  findAll() {
    return this.offresService.findAll();
  }

  @Get('getOfferById/:id')
  @ApiOperation({ summary: 'Get a single offer by ID' })
  @ApiParam({ name: 'id', type: Number, description: 'Offer ID' })
  @ApiResponse({ status: 200, description: 'Single offer details', type: FindOfferDto })
  @ApiResponse({ status: 404, description: 'Offer not found' })
  findOne(@Param('id') id: number) {
    return this.offresService.findOne(id);
  }
}
