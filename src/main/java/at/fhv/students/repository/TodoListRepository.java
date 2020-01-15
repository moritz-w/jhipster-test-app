package at.fhv.students.repository;

import at.fhv.students.domain.TodoList;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the TodoList entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TodoListRepository extends JpaRepository<TodoList, Long> {

}
