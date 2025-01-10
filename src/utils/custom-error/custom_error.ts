interface CustomErrorProps {
  gl: string;
  bd: string;
}

export class CustomError extends Error {
  code?: number;

  constructor(bd: string, gl: string, code?: number) {
    super(gl);
    this.code = code;
    this.message = JSON.stringify({ gl, bd });
  }
}
