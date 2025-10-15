export type ExploreStackParamList = {
  CarList: undefined;
  Detailed: { car_id: number };
  Booking: undefined;
  Confirmation: { start_date: string; end_date: string } | undefined;
};
