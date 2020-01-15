package at.fhv.students.web.rest;

import at.fhv.students.domain.TodoList;
import at.fhv.students.repository.TodoListRepository;
import at.fhv.students.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional; 
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link at.fhv.students.domain.TodoList}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class TodoListResource {

    private final Logger log = LoggerFactory.getLogger(TodoListResource.class);

    private static final String ENTITY_NAME = "todoList";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final TodoListRepository todoListRepository;

    public TodoListResource(TodoListRepository todoListRepository) {
        this.todoListRepository = todoListRepository;
    }

    /**
     * {@code POST  /todo-lists} : Create a new todoList.
     *
     * @param todoList the todoList to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new todoList, or with status {@code 400 (Bad Request)} if the todoList has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/todo-lists")
    public ResponseEntity<TodoList> createTodoList(@RequestBody TodoList todoList) throws URISyntaxException {
        log.debug("REST request to save TodoList : {}", todoList);
        if (todoList.getId() != null) {
            throw new BadRequestAlertException("A new todoList cannot already have an ID", ENTITY_NAME, "idexists");
        }
        TodoList result = todoListRepository.save(todoList);
        return ResponseEntity.created(new URI("/api/todo-lists/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /todo-lists} : Updates an existing todoList.
     *
     * @param todoList the todoList to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated todoList,
     * or with status {@code 400 (Bad Request)} if the todoList is not valid,
     * or with status {@code 500 (Internal Server Error)} if the todoList couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/todo-lists")
    public ResponseEntity<TodoList> updateTodoList(@RequestBody TodoList todoList) throws URISyntaxException {
        log.debug("REST request to update TodoList : {}", todoList);
        if (todoList.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        TodoList result = todoListRepository.save(todoList);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, todoList.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /todo-lists} : get all the todoLists.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of todoLists in body.
     */
    @GetMapping("/todo-lists")
    public List<TodoList> getAllTodoLists() {
        log.debug("REST request to get all TodoLists");
        return todoListRepository.findAll();
    }

    /**
     * {@code GET  /todo-lists/:id} : get the "id" todoList.
     *
     * @param id the id of the todoList to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the todoList, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/todo-lists/{id}")
    public ResponseEntity<TodoList> getTodoList(@PathVariable Long id) {
        log.debug("REST request to get TodoList : {}", id);
        Optional<TodoList> todoList = todoListRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(todoList);
    }

    /**
     * {@code DELETE  /todo-lists/:id} : delete the "id" todoList.
     *
     * @param id the id of the todoList to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/todo-lists/{id}")
    public ResponseEntity<Void> deleteTodoList(@PathVariable Long id) {
        log.debug("REST request to delete TodoList : {}", id);
        todoListRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
