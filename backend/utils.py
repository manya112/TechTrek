from bson import ObjectId


def mongo_to_json(doc):
    if isinstance(doc, list):
        return [mongo_to_json(d) for d in doc]
    elif isinstance(doc, dict):
        new_doc = {}
        for k, v in doc.items():
            if k == "_id":
                new_doc["id"] = str(v)  # Rename _id to id
            else:
                new_doc[k] = mongo_to_json(v)
        return new_doc
    elif isinstance(doc, ObjectId):
        return str(doc)
    else:
        return doc
