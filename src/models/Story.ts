interface Story {
  id: number;
  title: string;
  last_modified: string;
  status: string;
  live_from?: string;
  published_date?: string;
  ends?: string;
}

export default Story;
