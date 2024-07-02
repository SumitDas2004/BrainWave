package com.brainwave.backend.dao;

import com.brainwave.backend.entity.Question;
import com.brainwave.backend.entity.QuestionId;
import com.brainwave.backend.entity.Quiz;
import org.springframework.data.jpa.repository.JpaRepository;

public interface QuestionDao extends JpaRepository<Question, QuestionId> {
}
