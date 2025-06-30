import {
  validateLength,
  validateNoSpaces,
  validateSpecialChars,
  validateNotOnlyNumbers,
  validateMaxNumbers,
  validateUniqueness,
  validateName,
} from './validators'; // Adjust path if needed

describe('Name Validators', () => {
  test('validateLength - valid length', () => {
    expect(validateLength('Andrey12')).toBe(true);
  });

  test('validateLength - too short', () => {
    expect(validateLength('abc')).toBe(
      'El nombre debe tener entre 5 y 20 caracteres.'
    );
  });

  test('validateNoSpaces', () => {
    expect(validateNoSpaces('NoSpaces')).toBe(true);
    expect(validateNoSpaces('With space')).toBe('No se permiten espacios.');
  });

  test('validateSpecialChars', () => {
    expect(validateSpecialChars('Normal123')).toBe(true);
    expect(validateSpecialChars('Invalid@!')).toBe(
      'No se permiten caracteres especiales.'
    );
  });

  test('validateNotOnlyNumbers', () => {
    expect(validateNotOnlyNumbers('Andrey95')).toBe(true);
    expect(validateNotOnlyNumbers('123456')).toBe(
      'El nombre no puede ser solo números.'
    );
  });

  test('validateMaxNumbers', () => {
    expect(validateMaxNumbers('User123')).toBe(true);
    expect(validateMaxNumbers('User12345')).toBe(
      'No se permiten más de 3 números.'
    );
  });

  test('validateUniqueness', () => {
    const existing = ['Carlos', 'Juan'];
    expect(validateUniqueness('Pedro', existing)).toBe(true);
    expect(validateUniqueness('carlos', existing)).toBe(
      'Ese nombre ya está en uso, elige otro.'
    );
  });

  test('validateName - full valid', () => {
    expect(validateName('Andrey95', ['Other'])).toBe(null);
  });

  test('validateName - returns first error only', () => {
    const name = 'abc de'; // Has a space => triggers validateNoSpaces first
    const result = validateName(name);
    expect(result).toBe('No se permiten espacios.');
  });
  

  test('validateName - uniqueness error comes last', () => {
    expect(validateName('Andrey', ['Andrey'])).toBe(
      'Ese nombre ya está en uso, elige otro.'
    );
  });
});
