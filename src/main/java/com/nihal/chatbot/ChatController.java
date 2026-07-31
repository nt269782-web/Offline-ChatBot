package com.nihal.chatbot;

import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.Map;

@RestController
@CrossOrigin(origins = "*")
public class ChatController {

    private final MessageRepository repository;

    public ChatController(MessageRepository repository) {
        this.repository = repository;
    }

    @PostMapping("/chat")
    public Map<String, String> chat(@RequestBody Map<String, String> request) {

        String message = request.get("message");

        Message data = repository.findByQuestionIgnoreCase(message);

        Map<String, String> response = new HashMap<>();

        if (data != null) {
            response.put("reply", data.getAnswer());
        } else {
            response.put("reply", "Sorry, mujhe iska answer nahi pata.");
        }
        if (data != null) {
            response.put("reply", data.getAnswer());
        } else {

            Message msg = new Message();
            msg.setQuestion(message);
            msg.setAnswer("Pending");

            repository.save(msg);

            response.put("reply", "Sorry, mujhe iska answer nahi pata.");
        }
        return response;
    }
}