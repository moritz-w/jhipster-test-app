package at.fhv.students.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.LocalDate;

/**
 * A Todo.
 */
@Entity
@Table(name = "todo")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Todo implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "priority")
    private Integer priority;

    @Column(name = "done")
    private Boolean done;

    @Column(name = "expirydate")
    private LocalDate expirydate;

    @OneToOne
    @JoinColumn(unique = true)
    private Person person;

    @ManyToOne
    @JsonIgnoreProperties("todos")
    private TodoList todoList;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public Todo name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getPriority() {
        return priority;
    }

    public Todo priority(Integer priority) {
        this.priority = priority;
        return this;
    }

    public void setPriority(Integer priority) {
        this.priority = priority;
    }

    public Boolean isDone() {
        return done;
    }

    public Todo done(Boolean done) {
        this.done = done;
        return this;
    }

    public void setDone(Boolean done) {
        this.done = done;
    }

    public LocalDate getExpirydate() {
        return expirydate;
    }

    public Todo expirydate(LocalDate expirydate) {
        this.expirydate = expirydate;
        return this;
    }

    public void setExpirydate(LocalDate expirydate) {
        this.expirydate = expirydate;
    }

    public Person getPerson() {
        return person;
    }

    public Todo person(Person person) {
        this.person = person;
        return this;
    }

    public void setPerson(Person person) {
        this.person = person;
    }

    public TodoList getTodoList() {
        return todoList;
    }

    public Todo todoList(TodoList todoList) {
        this.todoList = todoList;
        return this;
    }

    public void setTodoList(TodoList todoList) {
        this.todoList = todoList;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Todo)) {
            return false;
        }
        return id != null && id.equals(((Todo) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Todo{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", priority=" + getPriority() +
            ", done='" + isDone() + "'" +
            ", expirydate='" + getExpirydate() + "'" +
            "}";
    }
}
