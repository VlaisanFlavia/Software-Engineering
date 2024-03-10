import { FormControl } from '@angular/forms';
import { minimumAgeValidator } from './minimAge.validator';

describe('minimumAgeValidator', () => {
    it('should return null if the age is greater than or equal to the minimum age', () => {
        const control = new FormControl('1995-05-09');
        const validator = minimumAgeValidator(18);
        expect(validator(control)).toBeNull();
    });

    it('should return an object if the age is less than the minimum age', () => {
        const control = new FormControl('2010-01-01');
        const validator = minimumAgeValidator(18);
        expect(validator(control)).toEqual({ minimumAge: { requiredAge: 18 } });
    });
});