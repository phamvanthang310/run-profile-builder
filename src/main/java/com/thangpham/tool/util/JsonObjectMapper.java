package com.thangpham.tool.util;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.io.IOException;

/**
 * Created by tpham.
 */
public class JsonObjectMapper extends ObjectMapper {
    private static final long serialVersionUID = -3790427355677699773L;
    private static final JsonObjectMapper INSTANCE = new JsonObjectMapper();

    private JsonObjectMapper() {
        setSerializationInclusion(JsonInclude.Include.NON_NULL);
        configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
    }

    public static JsonObjectMapper get() {
        return INSTANCE;
    }

    @Override
    public String writeValueAsString(Object value) {
        try {
            return super.writeValueAsString(value);
        } catch (JsonProcessingException e) {
            throw new RuntimeException("Could not parse data to JSON value", e);
        }
    }

    @Override
    public <T> T readValue(String content, Class<T> valueType) {
        try {
            return super.readValue(content, valueType);
        } catch (IOException e) {
            throw new RuntimeException("Could not parse JSON string to data type " + valueType, e);
        }
    }

    @SuppressWarnings("rawtypes")
    @Override
    public <T> T readValue(String content, TypeReference valueTypeRef) {
        try {
            return super.readValue(content, valueTypeRef);
        } catch (IOException e) {
            throw new RuntimeException("Could not parse JSON string to data type " + valueTypeRef.getType(), e);
        }
    }
}

