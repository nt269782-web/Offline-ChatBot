package com.nihal.chatbot;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/admin")
public class AdminController {

    private final MessageRepository repository;

    public AdminController(MessageRepository repository) {
        this.repository = repository;
    }

    @PostMapping("/save")
    public ResponseEntity<String> save(@RequestBody Message message) {
        repository.save(message);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body("Saved Successfully");
    }

    @GetMapping("/all")
    public List<Message> getAll() {
        return repository.findAll();
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> delete(@PathVariable Integer id) {

        if (!repository.existsById(id)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Record Not Found");
        }

        repository.deleteById(id);
        return ResponseEntity.ok("Deleted Successfully");
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<String> update(@PathVariable Integer id,
                                         @RequestBody Message message) {

        return repository.findById(id)
                .map(old -> {
                    old.setQuestion(message.getQuestion());
                    old.setAnswer(message.getAnswer());
                    repository.save(old);
                    return ResponseEntity.ok("Updated Successfully");
                })
                .orElse(ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body("Record Not Found"));
    }
}