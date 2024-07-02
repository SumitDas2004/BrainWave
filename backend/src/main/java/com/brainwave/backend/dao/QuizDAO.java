package com.brainwave.backend.dao;

import com.brainwave.backend.entity.Quiz;
import org.springframework.data.jpa.repository.JpaRepository;

public interface QuizDAO extends JpaRepository<Quiz, Long> {
}
