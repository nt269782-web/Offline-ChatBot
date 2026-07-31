package com.nihal.chatbot;

import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/admin")
public class AdminController {

    private final MessageRepository repository;

    public AdminController(MessageRepository repository) {
        this.repository = repository;
    }

    @PostMapping("/save")
    public String save(@RequestBody Message message) {

        repository.save(message);

        return "Saved Successfully";
    }
    @GetMapping("/all")
    public java.util.List<Message> getAll() {
        return repository.findAll();
    }
    @DeleteMapping("/delete/{id}")
    public String delete(@PathVariable Integer id) {
        repository.deleteById(id);
        return "Deleted Successfully";
    }
    @PutMapping("/update/{id}")
    public String update(@PathVariable Integer id, @RequestBody Message message){

        Message old = repository.findById(id).orElse(null);

        if(old != null){

            old.setQuestion(message.getQuestion());
            old.setAnswer(message.getAnswer());

            repository.save(old);

            return "Updated Successfully";
        }

        return "Record Not Found";
    }
}