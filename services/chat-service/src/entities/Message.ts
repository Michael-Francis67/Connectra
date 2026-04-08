import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Chat } from './Chat.ts';
import { MessageStatus, MessageType } from '@/types/index.ts';
import { Reaction } from './Reactions.ts';

@Entity({ name: 'messages' })
export class Message extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({
    type: 'uuid',
  })
  sender!: string;

  @ManyToOne(() => Chat, (chat) => chat.messages, {
    onDelete: 'CASCADE',
  })
  chatId!: Chat;

  @Column({
    type: 'json',
  })
  content!: {
    text?: string;
    images?: string[];
    audio?: string;
    video?: string;
    document?: string;
  };

  @Column({
    type: 'enum',
    enum: MessageType,
    default: MessageType.TEXT,
  })
  type!: MessageType;

  @Column({ type: 'json', nullable: true })
  fileSize?: string;

  @Column({
    type: 'json',
    nullable: true,
  })
  duration?: number;

  @Column({
    type: 'enum',
    enum: MessageStatus,
    default: MessageStatus.PENDING,
  })
  status!: MessageStatus;

  @OneToMany(() => Reaction, (reaction) => reaction.message)
  reactions?: Reaction[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
