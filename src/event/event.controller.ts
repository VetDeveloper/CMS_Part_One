import { Controller, UseGuards } from '@nestjs/common';
import { Crud, CrudAuth, CrudController } from '@nestjsx/crud';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { EventOwnerGuard } from 'src/auth/guards/eventOwner.guard';
import { User } from 'src/user/users.entity';
import { CreateEventDTO } from './dto/create-event.dto';
import { UpdateEventDTO } from './dto/update-event.dto';
import { Event } from './event.entity';
import { EventService } from './event.service';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';

@Crud({
  model: {
    type: Event,
  },
  dto: {
    create: CreateEventDTO,
    update: UpdateEventDTO,
    replace: CreateEventDTO,
  },
  routes: {
    createOneBase: {
      decorators: [
        UseGuards(JwtAuthGuard),
        ApiBearerAuth(),
        ApiResponse({ status: 200, type: CreateEventDTO }),
      ],
    },
    createManyBase: {
      decorators: [
        UseGuards(JwtAuthGuard),
        ApiBearerAuth(),
        ApiResponse({ status: 200, type: [CreateEventDTO] }),
      ],
    },
    updateOneBase: {
      decorators: [
        UseGuards(JwtAuthGuard, EventOwnerGuard),
        ApiBearerAuth(),
        ApiResponse({ status: 201, type: CreateEventDTO }),
      ],
    },
    replaceOneBase: {
      decorators: [
        UseGuards(JwtAuthGuard, EventOwnerGuard),
        ApiBearerAuth(),
        ApiResponse({ status: 201, type: CreateEventDTO }),
      ],
    },
    deleteOneBase: {
      decorators: [
        UseGuards(JwtAuthGuard, EventOwnerGuard),
        ApiBearerAuth(),
        ApiResponse({ status: 201, type: CreateEventDTO }),
      ],
    },
    getOneBase: {
      decorators: [ApiResponse({ status: 200, type: CreateEventDTO })],
    },
    getManyBase: {
      decorators: [ApiResponse({ status: 200, type: [CreateEventDTO] })],
    },
  },
})
@CrudAuth({
  property: 'user',
  persist: (user: User) => ({
    userId: user?.id,
  }),
})
@ApiTags('Events')
@Controller('events')
export class EventController implements CrudController<Event> {
  constructor(public service: EventService) {}
}
