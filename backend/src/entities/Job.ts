import { Entity, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core';

@Entity()
export class Job {
  @PrimaryKey()
  id: number;

  @Property()
  title: string;

  @Property()
  description: string;

  @Property()
  location: string;

  @Property()
  hourlyPay: number;

  @Property()
  createTs: Date = new Date();

  @Property({ onUpdate: () => new Date() })
  updateTs: Date = new Date();

  constructor(
    title: string,
    description: string,
    location: string,
    hourlyPay: number,
  ) {
    this.title = title;
    this.description = description;
    this.location = location;
    this.hourlyPay = hourlyPay;
  }
}
