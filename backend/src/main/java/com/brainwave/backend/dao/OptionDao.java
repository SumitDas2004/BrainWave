package com.brainwave.backend.dao;

import com.brainwave.backend.entity.Option;
import com.brainwave.backend.entity.OptionId;
import com.brainwave.backend.entity.Quiz;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OptionDao extends JpaRepository<Option, OptionId> {
}
