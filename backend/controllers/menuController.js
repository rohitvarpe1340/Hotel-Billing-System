import  db from "../config/db.js";

export const addItem=async(req,res)=>{

try{

const {
category_id,
item_name,
price
}=req.body;

await db.execute(
`INSERT INTO menu_items
(category_id,item_name,price)
VALUES(?,?,?)`,
[
category_id,
item_name,
price
]
);

res.json({
success:true
});

}
catch(err){
res.status(500).json(err);
}

};


export const getMenu = async (req, res) => {

try {

const [rows] = await db.execute(
`
SELECT
m.id,
m.item_name,
m.price,
m.status,
c.category_name
FROM menu_items m
JOIN categories c
ON c.id = m.category_id

WHERE
m.status = 'ACTIVE'
AND
c.status = 'ACTIVE'
`
);

res.json(rows);

}
catch(err) {

res.status(500).json(err);

}

};

export const updateItem=async(req,res)=>{

try{

const {
item_name,
price
}=req.body;

await db.execute(
`
UPDATE menu_items
SET item_name=?,
price=?
WHERE id=?
`,
[
item_name,
price,
req.params.id
]
);

res.json({
success:true
});

}
catch(err){
res.status(500).json(err);
}

};

export const changeItemStatus=async(req,res)=>{

try{

await db.execute(
`
UPDATE menu_items
SET status=?
WHERE id=?
`,
[
req.body.status,
req.params.id
]
);

res.json({
success:true
});

}
catch(err){
res.status(500).json(err);
}

};

export const deleteItem=async(req,res)=>{

try{

await db.execute(
`
DELETE FROM menu_items
WHERE id=?
`,
[req.params.id]
);

res.json({
success:true
});

}
catch(err){
res.status(500).json(err);
}

};