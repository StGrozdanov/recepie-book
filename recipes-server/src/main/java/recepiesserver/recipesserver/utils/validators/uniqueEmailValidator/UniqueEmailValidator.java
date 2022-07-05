package recepiesserver.recipesserver.utils.validators.uniqueEmailValidator;

import recepiesserver.recipesserver.services.UserService;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

public class UniqueEmailValidator implements ConstraintValidator<UniqueEmail, String> {
    private final UserService userService;

    public UniqueEmailValidator(UserService userService) {
        this.userService = userService;
    }

    @Override
    public boolean isValid(String value, ConstraintValidatorContext context) {
        return !this.userService.userWithTheSameEmailExists(value);
    }
}