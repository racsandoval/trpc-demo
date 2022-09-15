export type FeedbackModel = {
  id: string;
  createdAt: Date;
  answeredAt?: Date;
}

export type FeedbackInputModel = {
  inviterId: string;
  inviteeId: string;
}
