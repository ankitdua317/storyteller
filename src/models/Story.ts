export enum Status {
  DRAFT = "draft",
  SCHEDULED = "scheduled",
  LIVE = "live",
  PAST = "past",
}

interface Story {
  id: number;
  title: string;
  last_modified: string;
  status: Status;
  live_from?: string;
  published_date?: string;
  ends?: string;
}

export default Story;
