import { Response } from 'express';

const getErrorMessage = (message: string): string | string[] => {
  const errors = [];
  const lines = message.split('\n').map((line) => line.trim());

  const argLines = lines.filter((line) => line.includes('is missing.'));
  const invalidLines = lines.filter((line) => line.includes('Got invalid value'));
  const invalidForeignLines = lines.filter((line) => line.includes('key constraint failed'));

  // (1) Argument <argName> for data.<modelName> is missing.
  if (argLines.length) {
    argLines.forEach((line) => {
      const argName = line.match(/^Argument (.+) for data\..+ is missing\.$/)?.[1];
      errors.push(`${argName} argument is missing.`);
    });
  }

  // (2) Got invalid value <value> for <argName> argument.<expected>
  if (invalidLines.length) {
    invalidLines.forEach((line) => {
      const argNameStart = line.indexOf('Argument ') + 'Argument '.length;
      const argNameEnd = line.indexOf(':', argNameStart);
      const argName = line.substring(argNameStart, argNameEnd);

      const providedStart = line.indexOf('Provided ') + 'Provided '.length;
      const providedEnd = line.indexOf(',', providedStart);

      const expectedStart = line.indexOf('expected ', providedEnd) + 'expected '.length;
      if (expectedStart === -1) return undefined;
      const expectedEnd = line.indexOf('.', expectedStart) !== -1 ? line.indexOf('.', expectedStart) : undefined;
      const expected =
        expectedEnd !== undefined ? line.substring(expectedStart, expectedEnd) : line.substring(expectedStart);

      errors.push(`${argName} argument value is invalid, Expected ${expected.trim()}.`);
    });
  }

  // (3) One or more records that were required but not found.
  if (lines.some((line) => line.includes('required but not found'))) {
    errors.push('One or more records that were required but not found.');
  }

  // (4) One or more argunents must be unique.
  if (lines.some((line) => line.includes('Unique constraint'))) {
    errors.push('One or more arguments must be unique.');
  }

  // (5) <argName> is invalid.
  if (invalidForeignLines.length) {
    invalidForeignLines.forEach((line) => {
      const pattern = /Foreign key constraint failed on the field: `([^`]+)`/;
      const match = line.match(pattern);

      errors.push(`${match?.[1]} is invalid or connected to another record.`);
    });
  }

  // ========= If the error is not known =========
  return errors.length ? errors : ['Unknown error occurred.'];
};

// Function to handle the error response
export const responseError = (res: Response, err: Error, message = 'Server `Error`') => {
  console.log(err);
  // If the error is not known
  if (err instanceof SyntaxError) {
    return res.status(500).json({ success: false, message: message });
  }

  return res.status(400).json({ success: false, errors: getErrorMessage(err.message) });
};
