
import { Body, Controller, Get, HttpStatus, Param, ParseIntPipe, Post, Query, Req, Res, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { Request, Response } from "express";
import { ZnsService } from './zns.service';
import { ResponseData } from 'src/utils.common/utils.response.common/utils.response.common';
import { EventDto } from './zns.dto/zns.dto';
import { ZnsMessageDto } from './zns.dto/zns-message.dto';

class AnyObjectDto {
    [key: string]: any;
}

@Controller('zns-webhook')
export class ZnsController {

    constructor(
        private readonly znsService: ZnsService
    ) { }

    @Get("/authentication-code")
    @ApiOperation({ summary: "API get authentication code" })
    @UsePipes(new ValidationPipe({ transform: true }))
    async getAuthenticationCode(
        @Query(new ValidationPipe()) dto: { code: string, oa_id: string },
        @Res() res: Response
    ) {

        let response: ResponseData = new ResponseData();
        console.log(dto);

        if (dto.code && dto.oa_id && dto.code != undefined && dto.oa_id != undefined) {
            await this.znsService.authenticationCode(dto);
        }
        return res.status(HttpStatus.OK).send(response);
    }


    @Post("/tracking")
    @ApiOperation({ summary: "API webhook tracking message" })
    @UsePipes(new ValidationPipe({ transform: true }))
    async trackingMessage(
        @Body() dto: ZnsMessageDto,
        @Res() res: Response
    ) {
        if (dto && dto != undefined) {
            console.log(dto);
            
            await this.znsService.trackingMessage(
                {
                    tracking_id: dto.message.tracking_id,
                    phone: dto.recipient.id,
                    msg_id: dto.message.msg_id,
                    delivery_time: dto.message.delivery_time
                }
            );
        }
        let response: ResponseData = new ResponseData();
        return res.status(HttpStatus.OK).send(response);
    }
}
