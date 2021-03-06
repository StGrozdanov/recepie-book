package recepiesserver.recipesserver.controllers;

import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import recepiesserver.recipesserver.models.dtos.commentDTOs.*;
import recepiesserver.recipesserver.services.CommentService;
import recepiesserver.recipesserver.utils.constants.Api;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import javax.validation.constraints.NotBlank;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class CommentController {
    private final CommentService commentService;

    public CommentController(CommentService commentService) {
        this.commentService = commentService;
    }

    @GetMapping(Api.GET_ALL_RECIPE_COMMENTS)
    public ResponseEntity<List<CommentDetailsDTO>> getAllCommentsForTargetRecipe(@PathVariable Long recipeId) {
        return ResponseEntity.ok().body(this.commentService.getAllCommentsForTargetRecipe(recipeId));
    }

    @PostMapping(Api.COMMENT_ENDPOINT)
    public ResponseEntity<CommentIdDTO> createComment(@RequestBody @Valid CommentCreateDTO commentDTO) {
        CommentIdDTO createdCommentId = this.commentService.createNewComment(commentDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdCommentId);
    }

    @DeleteMapping(Api.DELETE_COMMENT)
    @PreAuthorize("@jwtUtil.userIsResourceOwner(" +
            "#request.getHeader('Authorization'), @commentService.getCommentOwnerUsername(#id)) " +
            "|| hasRole('ADMINISTRATOR') || hasRole('MODERATOR')")
    public ResponseEntity<CommentModifiedAtDTO> deleteComment(@PathVariable Long id, HttpServletRequest request) {
        CommentModifiedAtDTO modifiedAt = this.commentService.deleteComment(id);
        return ResponseEntity.ok().body(modifiedAt);
    }

    @PutMapping(Api.EDIT_COMMENT)
    @PreAuthorize("@jwtUtil.userIsResourceOwner(" +
            "#request.getHeader('Authorization'), @commentService.getCommentOwnerUsername(#id)) " +
            "|| hasRole('ADMINISTRATOR') || hasRole('MODERATOR')")
    public ResponseEntity<CommentIdDTO> editComment(@RequestBody @Valid CommentEditDTO commentDTO,
                                                    @PathVariable Long id,
                                                    HttpServletRequest request) {
        CommentIdDTO editedCommentId = this.commentService.editComment(commentDTO, id);
        return ResponseEntity.ok().body(editedCommentId);
    }

    @GetMapping(Api.LATEST_SIX_COMMENTS)
    public ResponseEntity<List<CommentDetailsDTO>> getTheLatestSixComments() {
        return ResponseEntity.ok().body(this.commentService.getTheLatestSixComments());
    }

    @GetMapping(Api.COMMENT_COUNT)
    public ResponseEntity<CommentCountDTO> totalCommentsCount() {
        return ResponseEntity.ok(this.commentService.getTotalCommentsCount());
    }

    @GetMapping(Api.SEARCH_COMMENTS_BY_CONTENT)
    public ResponseEntity<Page<CommentAdminPanelDTO>> searchCommentsByContent(
            @RequestParam(name = "whereContent") @NotBlank String content,
            @RequestParam(name = "skip", defaultValue = "0") Integer pageNumber,
            @RequestParam(name = "limit", defaultValue = "7") Integer collectionCount,
            @RequestParam(name = "sortBy", defaultValue = "id") String sortBy) {
        return ResponseEntity
                .ok()
                .body(this.commentService.findCommentsByContent(content, pageNumber, collectionCount, sortBy));
    }

    @GetMapping(Api.GET_ALL_COMMENTS)
    public ResponseEntity<Page<CommentAdminPanelDTO>> getAllComments(
            @RequestParam(name = "skip", defaultValue = "0") Integer pageNumber,
            @RequestParam(name = "limit", defaultValue = "7") Integer collectionCount,
            @RequestParam(name = "sortBy", defaultValue = "id") String sortBy) {
        return ResponseEntity
                .ok()
                .body(this.commentService.getAllRecipes(pageNumber, collectionCount, sortBy));
    }
}