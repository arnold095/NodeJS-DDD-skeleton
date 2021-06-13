import { MailAddress, MailBody, MailId, MailSubject } from '@notificationsMail';
import { Uuid } from '@sharedDomain';

export class Mail {
  public constructor(
    private readonly _id: MailId,
    private readonly _from: MailAddress,
    private readonly _to: MailAddress,
    private readonly _subject: MailSubject,
    private readonly _body: MailBody
  ) {}

  static create(
    from: MailAddress,
    to: MailAddress,
    subject: MailSubject,
    body: MailBody
  ): Mail {
    return new Mail(new MailId(Uuid.random().value), from, to, subject, body);
  }

  get id(): MailId {
    return this._id;
  }

  get from(): MailAddress {
    return this._from;
  }

  get to(): MailAddress {
    return this._to;
  }

  get subject(): MailSubject {
    return this._subject;
  }

  get body(): MailBody {
    return this._body;
  }
}
