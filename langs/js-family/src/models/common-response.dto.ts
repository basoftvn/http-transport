export class CommonResponseDto<BodyType> {
  public success: boolean;
  public error: number;
  public message: string[];
  public body?: BodyType | undefined;

  public static Builder: typeof Builder;
}

class Builder<BodyType> {
  private readonly response: CommonResponseDto<BodyType>;

  private constructor() {
    this.response = new CommonResponseDto<BodyType>();

    this.response.success = true;
    this.response.error = 0;
    this.response.message = [];
    this.response.body = undefined;
  }

  public static create<BodyType>() {
    return new Builder<BodyType>();
  }

  public succeed(): Builder<BodyType> {
    this.response.success = true;
    this.response.error = 0;

    return this;
  }

  public fail(errCode: number): Builder<BodyType> {
    this.response.success = false;
    this.response.error = errCode;

    return this;
  }

  public notify(message: string[]): Builder<BodyType> {
    this.response.message = message;

    return this;
  }

  public attach(body: BodyType): Builder<BodyType> {
    this.response.body = body;

    return this;
  }

  public detach(): Builder<BodyType> {
    delete this.response.body;

    return this;
  }

  public build(): CommonResponseDto<BodyType> {
    return this.response;
  }
}

CommonResponseDto.Builder = Builder;
