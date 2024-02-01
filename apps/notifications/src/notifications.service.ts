import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class NotificationsService {
  constructor(private readonly mailerService: MailerService) {}

  async notificate(email: string) {
    try {
      await this.mailerService.sendMail({
        to: email,
        from: 'hollow.vessel@mail.ru',
        subject: 'You reserved a place',
        text: 'Reservation service',
      });
    } catch (err) {
      console.log(err);
    }
  }
}
