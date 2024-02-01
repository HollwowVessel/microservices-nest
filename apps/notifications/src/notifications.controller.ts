import { UserDto } from '@app/common';
import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { NotificationsService } from './notifications.service';

@Controller()
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @MessagePattern('create_notification')
  create_notification(data: Pick<UserDto, 'email'>) {
    return this.notificationsService.notificate(data.email);
  }
}
