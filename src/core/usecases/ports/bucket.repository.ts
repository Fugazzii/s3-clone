export interface IBucketRepository {
	count<CountOptions>(opts: CountOptions): Promise<number>;
}