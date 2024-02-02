import { CurrentUser, UserDto } from '@app/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { ReservationDocument } from './models/reservation.schema';
import { ReservationsService } from './reservations.service';

@Resolver(() => ReservationDocument)
export class ReservationsResolver {
  constructor(private readonly reservationsService: ReservationsService) {}

  @Mutation(() => ReservationDocument)
  async createReservation(
    @Args('createReservationInput')
    createReservationInput: CreateReservationDto,
    @CurrentUser() currentUser: UserDto,
  ) {
    return this.reservationsService.create(createReservationInput, currentUser);
  }

  @Query(() => [ReservationDocument], { name: 'reservations' })
  findAll() {
    return this.reservationsService.findAll();
  }

  @Query(() => ReservationDocument, { name: 'reservation' })
  findOne(
    @Args('reservationId', { type: () => String }) reservationId: string,
  ) {
    return this.reservationsService.findOne(reservationId);
  }

  @Mutation(() => ReservationDocument)
  async removeReservation(
    @Args('reservationId', { type: () => String }) reservationId: string,
  ) {
    return this.reservationsService.remove(reservationId);
  }
}
