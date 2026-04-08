export enum MessageType {
  TEXT = 'text',
  IMAGE = 'image',
  AUDIO = 'audio',
  VIDEO = 'video',
  DOCUMENT = 'document',
  IMAGE_TEXT = 'image_text',
  VIDEO_TEXT = 'video_text',
  DOCUMENT_TEXT = 'document_text',
}

export enum MessageStatus {
  PENDING = 'pending',
  SENT = 'sent',
  DELIVERED = 'delivered',
  FAILED = 'failed',
  EDITED = 'edited',
  READ = 'read',
}
