import {
  CanActivate,
  ExecutionContext,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { EventDTO } from 'src/event/dto/event.dto';
import { Event } from 'src/event/event.entity';
import { EventService } from 'src/event/event.service';

@Injectable()
export class EventOwnerGuard implements CanActivate {
  constructor(private eventService: EventService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();

    const logUserId = req.user.id;
    const eventId = parseInt(req.params.id);

    const ownerId: Promise<EventDTO> = this.eventService.findOne(eventId);

    return ownerId.then((resp) => {
      try {
        resp.userId;
      } catch (e) {
        throw new NotFoundException(e);
      }
      return logUserId === resp.userId;
    });
  }
}
