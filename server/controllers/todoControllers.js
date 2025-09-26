import todomodel from "../models/todomodel.js";

export const createTodos = async (req, res) => {
    try {
        const { title, content } = req.body;
        const userId = req.user


        const newTodo = new todomodel({
            title,
            content,
            userId
        })

        const saveTodo = await newTodo.save();

        return res.status(201).json({
            message: "Todo created successfully",
            success: true,
            saveTodo
        })
    } catch (error) {
        return res.status(400).json({
            message: "Error found while saving todos",
            success: false,
            error
        })
    }
}

export const getTodos = async (req, res) => {
    try {


        const getTodos = await todomodel.find({ userId: req.user })
        return res.status(200).json({
            message: "Here are all your todos",
            success: true,
            getTodos
        })
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            message: error,
            success: false
        })
    }
}

export const deleteTodos = async (req, res) => {
    try {

        const { todoid } = req.params
        const userId = req.user
        const getuserId = await todomodel.findOne({ _id: todoid, userId });

        if (!getuserId) {
            return res.json({
                message: "Todo not found"
            })
        }

        await todomodel.deleteOne({ _id: todoid, userId });

        return res.status(200).json({
            message: "todo deleted successfully",
            success: true
        })





    } catch (error) {
        console.log(error)
        return res.status(400).json({
            message: error,
            success: false
        })
    }
}

export const updateTodos = async (req, res) => {
    try {
        const { todoid } = req.params;
        const todos = req.body;
        const userId = req.user

        const getuserId = await todomodel.findOne({ _id: todoid, userId });

        if (!getuserId) {
            return res.json({
                message: "Todo not found"
            })
        }

        const updatedTodo = await todomodel.findByIdAndUpdate({ _id: todoid, userId }, todos, { new: true });

        return res.status(200).json({
            message: "Todo updated successfully",
            success: true,
            updatedTodo
        })
    } catch (error) {
        res.status(400).json({
            message: "Error found while updating todos",
            success: false,
            error
        })
    }
}

export const getSpecificTodo = async (req, res) => {
    try {
        const { id } = req.params;
        // const todos = req.body;
        const userId = req.user;

        console.log("Looking for todo with:", { _id: id, userId });
        const getSpecificTodos = await todomodel.findOne({
            _id: id,
            userId: new mongoose.Types.ObjectId(userId) // important
        });

        return res.status(200).json({
            message: "here all your users todos",
            success: true,
            getSpecificTodos
        })
    } catch (error) {
        return res.status(400).json({
            message: 'Error found while fetching todo',
            success: false,
            error
        })
    }
}