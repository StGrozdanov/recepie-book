package recepiesserver.recipesserver.utils.validators.UniqueImageValidator;

import javax.validation.Constraint;
import javax.validation.Payload;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.METHOD)
@Constraint(validatedBy = UniqueImageValidator.class)
public @interface UniqueImage {
    String message() default "Recipe with the same image already exists.";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};
}
