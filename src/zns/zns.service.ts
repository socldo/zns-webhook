import { Injectable, OnModuleInit } from '@nestjs/common';
import { Client, ClientGrpc, ClientProxyFactory, Transport } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/mongoose';
import { join } from 'path';
import { lastValueFrom } from 'rxjs';
import { grpcClientOptions } from 'src/grpc/clients/campaign-grpc-client-option';
import { BaseResponseZns, ZNS_WEBHOOK_SERVICE_NAME, ZnsTrackingRequest, ZnsWebhookServiceClient } from 'src/grpc/interfaces/webhook-zns';
import { AuthenticationCodeRequest, ZNSCampaignServiceClient, ZNS_CAMPAIGN_SERVICE_NAME } from 'src/grpc/interfaces/zns-campaign';
import { ZnsHistory, ZnsHistoryDocument } from './zns.model/zns-history.schema';
import { Model } from 'mongoose';
import { grpcHistoryClientOptions } from 'src/grpc/clients/zns-history-grpc-client-option';

@Injectable()
export class ZnsService implements OnModuleInit {
  @Client(grpcClientOptions)
  private readonly client: ClientGrpc;

  @Client(grpcHistoryClientOptions)
  private readonly clientHistory: ClientGrpc;

  private zNSCampaignServiceClient: ZNSCampaignServiceClient;

  private znsWebhookServiceClient: ZnsWebhookServiceClient;


  constructor(
    @InjectModel(ZnsHistory.name) private znsHistoryModel: Model<ZnsHistoryDocument>,
  ) {
  }

  onModuleInit() {
    this.zNSCampaignServiceClient = this.client.getService<ZNSCampaignServiceClient>(ZNS_CAMPAIGN_SERVICE_NAME);
    this.znsWebhookServiceClient = this.clientHistory.getService<ZnsWebhookServiceClient>(ZNS_WEBHOOK_SERVICE_NAME);

  }

  async authenticationCode(request: AuthenticationCodeRequest): Promise<BaseResponseZns> {

    const result = await lastValueFrom(await this.zNSCampaignServiceClient.updateAuthenticationCode(request));

    return result;
  }

  async trackingMessage(request: ZnsTrackingRequest): Promise<BaseResponseZns> {

    const result = await lastValueFrom(await this.znsWebhookServiceClient.znsTracking(request));

    return result;
  }


  // async trackingMessage(trackingId: string, phone: string, messageId: string, delivery_time): Promise<any> {
  //     let znsHistory: ZnsHistoryDocument = await this.znsHistoryModel.findOne({ msg_id: messageId }).exec();

  //     if (znsHistory) {

  //       znsHistory.is_read = 1;

  //       await znsHistory.save();

  //     } else {

  //       znsHistory = new this.znsHistoryModel({
  //         zns_campaign_id: trackingId,
  //         phone,
  //         msg_id: messageId,
  //         delivery_time,
  //         is_read: 0
  //       });

  //       await znsHistory.save();
  //     }
  // }
}
