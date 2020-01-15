package at.fhv.students.web.rest;

import at.fhv.students.ToDoApp;
import at.fhv.students.domain.TodoList;
import at.fhv.students.repository.TodoListRepository;
import at.fhv.students.web.rest.errors.ExceptionTranslator;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;

import static at.fhv.students.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link TodoListResource} REST controller.
 */
@SpringBootTest(classes = ToDoApp.class)
public class TodoListResourceIT {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final Boolean DEFAULT_DONE = false;
    private static final Boolean UPDATED_DONE = true;

    private static final LocalDate DEFAULT_EXPIRYDATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_EXPIRYDATE = LocalDate.now(ZoneId.systemDefault());

    @Autowired
    private TodoListRepository todoListRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restTodoListMockMvc;

    private TodoList todoList;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final TodoListResource todoListResource = new TodoListResource(todoListRepository);
        this.restTodoListMockMvc = MockMvcBuilders.standaloneSetup(todoListResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static TodoList createEntity(EntityManager em) {
        TodoList todoList = new TodoList()
            .name(DEFAULT_NAME)
            .done(DEFAULT_DONE)
            .expirydate(DEFAULT_EXPIRYDATE);
        return todoList;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static TodoList createUpdatedEntity(EntityManager em) {
        TodoList todoList = new TodoList()
            .name(UPDATED_NAME)
            .done(UPDATED_DONE)
            .expirydate(UPDATED_EXPIRYDATE);
        return todoList;
    }

    @BeforeEach
    public void initTest() {
        todoList = createEntity(em);
    }

    @Test
    @Transactional
    public void createTodoList() throws Exception {
        int databaseSizeBeforeCreate = todoListRepository.findAll().size();

        // Create the TodoList
        restTodoListMockMvc.perform(post("/api/todo-lists")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(todoList)))
            .andExpect(status().isCreated());

        // Validate the TodoList in the database
        List<TodoList> todoListList = todoListRepository.findAll();
        assertThat(todoListList).hasSize(databaseSizeBeforeCreate + 1);
        TodoList testTodoList = todoListList.get(todoListList.size() - 1);
        assertThat(testTodoList.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testTodoList.isDone()).isEqualTo(DEFAULT_DONE);
        assertThat(testTodoList.getExpirydate()).isEqualTo(DEFAULT_EXPIRYDATE);
    }

    @Test
    @Transactional
    public void createTodoListWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = todoListRepository.findAll().size();

        // Create the TodoList with an existing ID
        todoList.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTodoListMockMvc.perform(post("/api/todo-lists")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(todoList)))
            .andExpect(status().isBadRequest());

        // Validate the TodoList in the database
        List<TodoList> todoListList = todoListRepository.findAll();
        assertThat(todoListList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllTodoLists() throws Exception {
        // Initialize the database
        todoListRepository.saveAndFlush(todoList);

        // Get all the todoListList
        restTodoListMockMvc.perform(get("/api/todo-lists?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(todoList.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)))
            .andExpect(jsonPath("$.[*].done").value(hasItem(DEFAULT_DONE.booleanValue())))
            .andExpect(jsonPath("$.[*].expirydate").value(hasItem(DEFAULT_EXPIRYDATE.toString())));
    }
    
    @Test
    @Transactional
    public void getTodoList() throws Exception {
        // Initialize the database
        todoListRepository.saveAndFlush(todoList);

        // Get the todoList
        restTodoListMockMvc.perform(get("/api/todo-lists/{id}", todoList.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(todoList.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME))
            .andExpect(jsonPath("$.done").value(DEFAULT_DONE.booleanValue()))
            .andExpect(jsonPath("$.expirydate").value(DEFAULT_EXPIRYDATE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingTodoList() throws Exception {
        // Get the todoList
        restTodoListMockMvc.perform(get("/api/todo-lists/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTodoList() throws Exception {
        // Initialize the database
        todoListRepository.saveAndFlush(todoList);

        int databaseSizeBeforeUpdate = todoListRepository.findAll().size();

        // Update the todoList
        TodoList updatedTodoList = todoListRepository.findById(todoList.getId()).get();
        // Disconnect from session so that the updates on updatedTodoList are not directly saved in db
        em.detach(updatedTodoList);
        updatedTodoList
            .name(UPDATED_NAME)
            .done(UPDATED_DONE)
            .expirydate(UPDATED_EXPIRYDATE);

        restTodoListMockMvc.perform(put("/api/todo-lists")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedTodoList)))
            .andExpect(status().isOk());

        // Validate the TodoList in the database
        List<TodoList> todoListList = todoListRepository.findAll();
        assertThat(todoListList).hasSize(databaseSizeBeforeUpdate);
        TodoList testTodoList = todoListList.get(todoListList.size() - 1);
        assertThat(testTodoList.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testTodoList.isDone()).isEqualTo(UPDATED_DONE);
        assertThat(testTodoList.getExpirydate()).isEqualTo(UPDATED_EXPIRYDATE);
    }

    @Test
    @Transactional
    public void updateNonExistingTodoList() throws Exception {
        int databaseSizeBeforeUpdate = todoListRepository.findAll().size();

        // Create the TodoList

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTodoListMockMvc.perform(put("/api/todo-lists")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(todoList)))
            .andExpect(status().isBadRequest());

        // Validate the TodoList in the database
        List<TodoList> todoListList = todoListRepository.findAll();
        assertThat(todoListList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteTodoList() throws Exception {
        // Initialize the database
        todoListRepository.saveAndFlush(todoList);

        int databaseSizeBeforeDelete = todoListRepository.findAll().size();

        // Delete the todoList
        restTodoListMockMvc.perform(delete("/api/todo-lists/{id}", todoList.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<TodoList> todoListList = todoListRepository.findAll();
        assertThat(todoListList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
