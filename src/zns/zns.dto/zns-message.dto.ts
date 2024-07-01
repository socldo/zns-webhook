import { ApiProperty } from '@nestjs/swagger';

class SenderDto {
  @ApiProperty({
    example: "3456919001738260298",
    description: "ID của người gửi",
  })
  readonly id: string;
}

class RecipientDto {
  @ApiProperty({
    example: "8367350385895045017",
    description: "ID của người nhận",
  })
  readonly id: string;
}

class MessageDto {
  @ApiProperty({
    example: "1719301454061",
    description: "Thời gian giao hàng",
  })
  readonly delivery_time: string;

  @ApiProperty({
    example: "f19fa05e7c738428dd67",
    description: "ID của tin nhắn",
  })
  readonly msg_id: string;

  @ApiProperty({
    example: "tai-2",
    description: "ID theo dõi",
  })
  readonly tracking_id: string;
}

export class ZnsMessageDto {
  @ApiProperty({
    example: "3839523187837974173",
    description: "ID của người dùng theo ứng dụng",
  })
  readonly user_id_by_app: string;

  @ApiProperty({
    example: {
      id: "8367350385895045017"
    },
    description: "Thông tin người nhận",
  })
  readonly recipient: RecipientDto;

  @ApiProperty({
    example: "Mobile",
    description: "Thiết bị nhận",
  })
  readonly receiver_device: string;

  @ApiProperty({
    example: "3637938744745910576",
    description: "ID của ứng dụng",
  })
  readonly app_id: string;

  @ApiProperty({
    example: "1719302596350",
    description: "Dấu thời gian",
  })
  readonly timestamp: string;

  @ApiProperty({
    example: {
      id: "3456919001738260298"
    },
    description: "Thông tin người gửi",
  })
  readonly sender: SenderDto;

  @ApiProperty({
    example: "user_received_message",
    description: "Tên sự kiện",
  })
  readonly event_name: string;

  @ApiProperty({
    example: {
      delivery_time: "1719301454061",
      msg_id: "f19fa05e7c738428dd67",
      tracking_id: "tai-2"
    },
    description: "Thông tin tin nhắn",
  })
  readonly message: MessageDto;
}
