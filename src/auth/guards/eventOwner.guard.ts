import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
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

    let ownerId: Promise<Event> = this.eventService.findOne(eventId);

    return ownerId.then((resp) => {
      return logUserId === resp.userId;
    });
  }
}
