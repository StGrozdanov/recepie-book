package recepiesserver.recipesserver.services;

import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import recepiesserver.recipesserver.models.dtos.recipeDTOs.RecipeCatalogueDTO;
import recepiesserver.recipesserver.models.dtos.recipeDTOs.RecipeCreateDTO;
import recepiesserver.recipesserver.models.dtos.recipeDTOs.RecipeDetailsDTO;
import recepiesserver.recipesserver.models.dtos.recipeDTOs.RecipeEditDTO;
import recepiesserver.recipesserver.models.entities.RecipeEntity;
import recepiesserver.recipesserver.models.entities.UserEntity;
import recepiesserver.recipesserver.repositories.RecipeRepository;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Service
public class RecipeService {
    private final RecipeRepository recipeRepository;
    private final ModelMapper modelMapper;
    private final UserService userService;

    public RecipeService(RecipeRepository recipeRepository, ModelMapper modelMapper, UserService userService) {
        this.recipeRepository = recipeRepository;
        this.modelMapper = modelMapper;
        this.userService = userService;
    }

    public List<RecipeCatalogueDTO> getAllRecipes() {
        List<RecipeEntity> allRecipes = this.recipeRepository.findAll();

        return allRecipes
                .stream()
                .map(recipe -> this.modelMapper.map(recipe, RecipeCatalogueDTO.class))
                .toList();
    }

    @Transactional
    public Optional<RecipeDetailsDTO> getSingleRecipe(Long id) {
        Optional<RecipeEntity> optionalEntity = this.recipeRepository.findById(id);

        RecipeDetailsDTO recipeDetailsDTO = this.modelMapper.map(optionalEntity, RecipeDetailsDTO.class);

        return Optional.ofNullable(recipeDetailsDTO);
    }

    @Transactional
    public void deleteRecipe(Long id) {
        this.recipeRepository.deleteById(id);
    }

    public Page<RecipeCatalogueDTO> getRecipesByPage(Integer pageNumber, Integer collectionCount, String sortBy) {
        Pageable pageable = PageRequest.of(pageNumber, collectionCount, Sort.by(sortBy));

        return this.recipeRepository
                .findAll(pageable)
                .map(recipe -> this.modelMapper.map(recipe, RecipeCatalogueDTO.class));
    }

    public Optional<RecipeEntity> findRecipeByName(String recipeName) {
        return this.recipeRepository.findByRecipeName(recipeName);
    }

    public Long createNewRecipe(RecipeCreateDTO recipeDTO) {
        Optional<UserEntity> userById = this.userService.findUserById(recipeDTO.getOwnerId());

        RecipeEntity newRecipe = this.modelMapper.map(recipeDTO, RecipeEntity.class);
        //the custom user id validator will handle the optional error case
        newRecipe.setOwnerId(userById.get().getId());

        RecipeEntity createdRecipe = this.recipeRepository.save(newRecipe);

        return createdRecipe.getId();
    }

    public Optional<RecipeEntity> findRecipeByImage(String image) {
        return this.recipeRepository.findByImageUrl(image);
    }

    public Optional<RecipeEntity> findRecipeById(Long id) {
        return this.recipeRepository.findById(id);
    }

    public Long editRecipe(RecipeEditDTO recipeDTO) {
        RecipeEntity recipeToEdit = this.recipeRepository.findById(recipeDTO.getId()).get();

        RecipeEntity editedRecipe = this.modelMapper.map(recipeDTO, RecipeEntity.class);

        editedRecipe.setOwnerId(recipeToEdit.getOwnerId());
        editedRecipe.setCreatedAt(recipeToEdit.getCreatedAt());
        editedRecipe.setVisitationsCount(recipeToEdit.getVisitationsCount());
        editedRecipe.setStatus(recipeToEdit.getStatus());

        return this.recipeRepository.save(editedRecipe).getId();
    }
}
