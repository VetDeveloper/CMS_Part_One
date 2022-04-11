import { Controller, UseGuards } from '@nestjs/common';
import { Crud, CrudAuth, CrudController } from '@nestjsx/crud';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { EventOwnerGuard } from 'src/auth/guards/eventOwner.guard';
import { CreateEventDTO } from './dto/create-event.dto';
import { UpdateEventDTO } from './dto/update-event.dto';
import { EventService } from './event.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ResponseEventDTO } from './dto/response-event.dto';
import { EventDTO } from './dto/event.dto';
import { UserDTO } from 'src/user/dto/user.dto';

@Crud({
  model: {
    type: EventDTO,
  },
  serialize: {
    update: ResponseEventDTO,
    get: ResponseEventDTO,
    delete: ResponseEventDTO,
    create: ResponseEventDTO,
    replace: ResponseEventDTO,
  },
  dto: {
    create: CreateEventDTO,
    update: UpdateEventDTO,
    replace: CreateEventDTO,
  },
  routes: {
    createOneBase: {
      decorators: [UseGuards(JwtAuthGuard), ApiBearerAuth()],
    },
    createManyBase: {
      decorators: [UseGuards(JwtAuthGuard), ApiBearerAuth()],
    },
    updateOneBase: {
      decorators: [UseGuards(JwtAuthGuard, EventOwnerGuard), ApiBearerAuth()],
    },
    replaceOneBase: {
      decorators: [UseGuards(JwtAuthGuard, EventOwnerGuard), ApiBearerAuth()],
    },
    deleteOneBase: {
      decorators: [UseGuards(JwtAuthGuard, EventOwnerGuard), ApiBearerAuth()],
    },
  },
})
@CrudAuth({
  property: 'user',
  persist: (user: UserDTO) => ({
    userId: user?.id,
  }),
})
@ApiTags('Events')
@Controller('events')
export class EventController implements CrudController<EventDTO> {
  constructor(public service: EventService) {}
}
