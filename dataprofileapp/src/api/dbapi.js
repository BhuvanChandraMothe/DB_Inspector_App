import axios from 'axios';
import { baseURL } from '../utilities/constants';

const BASE_URL = baseURL;

/**
 * Tests a database connection using the provided data.
 * @param {object} data - Connection details.
 * @returns {Promise<object>} - The response data from the API.
 */
export const testConnection = async (data) => {
    try {
        const response = await axios.post(`${BASE_URL}/connections/test`, {
            db_type: data.databaseType,                     // Capitalized expected (e.g., MongoDB)
            db_hostname: data.hostname,
            db_port: data.port,
            user_id: data.userId,
            password: data.password,
            database: data.databaseName || null, // Optional database field
        });
        return response.data; // This will be the TestConnectionResponse object
    } catch (error) {
        console.error("Error testing connection:", error);
        throw error;
    }
};

/**
 * Creates a new database connection.
 * @param {object} data - Connection details.
 * @returns {Promise<object>} - The response data from the API.
 */
export const createConnection = async (data) => {
    try {
        const response = await axios.post(`${BASE_URL}/connections`, {
            name: data.name,
            description: data.description || '', // Default to empty string if not provided
            db_type: data.databaseType,
            db_hostname: data.hostname,
            db_port: data.port,
            user_id: data.userId,
            password: data.password,
            database: data.databaseName || null, // Optional database field
        });
        return response.data; // This will be the DBConnection object
    } catch (error) {
        console.error("Error creating connection:", error);
        throw error;
    }
};

/**
 * Retrieves all database connections.
 * @returns {Promise<object[]>} - The list of connections.
 */
export const getAllConnections = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/connections`);
        return response.data; // This will be an array of DBConnection objects
    } catch (error) {
        console.error("Error getting all connections:", error);
        throw error;
    }
};

/**
 * Retrieves a single database connection by ID.
 * @param {number} id - Connection ID.
 * @returns {Promise<object>} - The connection data.
 */
export const getConnectionById = async (id) => {
    try {
        const response = await axios.get(`${BASE_URL}/connections/${id}`);
        return response.data; // This will be the DBConnection object
    } catch (error) {
        console.error("Error getting connection by ID:", error);
        throw error;
    }
};

/**
 * Updates an existing database connection.
 * @param {number} id - The connection ID.
 * @param {object} data - Updated connection details.
 * @returns {Promise<object>} - The updated connection data.
 */
export const updateConnection = async (id, data) => {
    try {
        const response = await axios.put(`${BASE_URL}/connections/${id}`, {
            name: data.name,
            description: data.description || '', // Default to empty string if not provided
            db_type: data.databaseType,
            db_hostname: data.hostname,
            db_port: data.port,
            user_id: data.userId,
            password: data.password,
            database: data.databaseName || null, // Optional database field
        });
        return response.data; // This will be the updated DBConnection object
    } catch (error) {
        console.error("Error updating connection:", error);
        throw error;
    }
};

/**
 * Deletes a database connection by its ID.
 * @param {number} id - The connection ID.
 * @returns {Promise<object>} - The response status.
 */
export const deleteConnection = async (id) => {
    try {
        const response = await axios.delete(`${BASE_URL}/connections/${id}`);
        return response.data; // This will return a success message, like { "message": "Connection deleted successfully" }
    } catch (error) {
        console.error("Error deleting connection:", error);
        throw error;
    }
};

/**
 * Gets schema overview (tables/collections and column/sample field details) for a specific database connection.
 * Supports SQL databases (PostgreSQL, MySQL, SQLite, etc.) and MongoDB.
 *
 * @param {number} connectionId - The connection ID.
 * @returns {Promise<object>} - Schema info including tables/collections and column/sample field metadata.
 */
export const getConnectionOverview = async (connectionId) => {
  try {
      const response = await axios.get(`${BASE_URL}/overview/${connectionId}`);
      return response.data; // Returns schema information (tables/collections and columns/fields)
  } catch (error) {
      console.error("Error getting connection overview:", error);
      throw error;
  }
};

