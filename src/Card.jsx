import React from 'react'

const Card = ({data,item,addItem,node}) => {
  return (
    <div>
        <h2 className="text-2xl font-bold text-blue-800 mb-2">
          {data?data.data.nodes[0].data.name:node.data.name}
        </h2>
        {(data?data.data.nodes[0].data.extraContent:node.data.extraContent) &&
          (data?data.data.nodes[0].data.extraContent:node.data.extraContent).map((c, i) => (
            <div
              key={i}
              style={{
                background: "#f0f0f0",
                padding: 5,
                borderRadius: 4,
                marginBottom: 4,
              }}
            >
              <div>{c.content}</div>
              {c.button && (
                <button
                  style={{
                    background: "#1976d2",
                    color: "#fff",
                    padding: "5px 10px",
                    border: "none",
                    borderRadius: "4px",
                    marginTop: 4,
                    cursor: "pointer",
                  }}
                  onClick={() => addItem(c.content, data?data.data.nodes[0].id:node.id)}
                >
                  {c.button}
                </button>
              )}
            </div>
          ))}
        {item.length > 0 && (
          <div className="mt-4">
            <h3 className="text-lg font-semibold">Added Items:</h3>
            <ul className="list-disc list-inside">
              {item.map((i, index) => (
                <li key={index} className="text-gray-700">
                  {i}
                </li>
              ))}
            </ul>
          </div>
        )}
    </div>
  )
}

export default Card