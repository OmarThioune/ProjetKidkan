import { useEffect, useState } from "react";
import axios from "axios";

export default function Instance() {
  const [instances, setInstances] = useState([]);
  const [subActivities, setSubActivities] = useState([]);
  const [form, setForm] = useState({
    start: "",
    end: "",
    deadline: "",
    places: 0,
    nb_inscription: 0,
    debutHour: "",
    endHour: "",
    status: "",
    minutes: 0,
    debutSubscription: "",
    location: "",
    cancelation: "",
    sub_activity_id: "",
    civil_number: "",
    street_name: "",
    postal_code: "",
    city: "",
    province: "",
    country: "",
    address_description: "",
    price: 0,
    type: ""
  });

  const fetchInstances = async () => {
    const res = await axios.get("/api/instance_activities");
    setInstances(res.data.data);
  };

  const fetchSubActivities = async () => {
    try {
      const res = await axios.get("/api/sub_activities");
      setSubActivities(res.data.data);
    } catch (error) {
      console.error("Erreur de chargement des sous-activités:", error);
    }
  };

  useEffect(() => {
    fetchInstances();
    fetchSubActivities();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const addressRes = await axios.post("/api/addresses", {
        civil_number: form.civil_number,
        street_name: form.street_name,
        postal_code: form.postal_code,
        city: form.city,
        province: form.province,
        country: form.country,
        address_description: form.address_description,
      });

      const address_id = addressRes.data.data.id;

      console.log("Address ID:", address_id);

      const instanceRes = await axios.post("/api/instance_activities", {
        start: form.start,
        end: form.end,
        deadline: form.deadline,
        places: form.places,
        nb_inscription: form.nb_inscription,
        debutHour: form.debutHour,
        endHour: form.endHour,
        status: form.status,
        minutes: form.minutes,
        debutSubscription: form.debutSubscription,
        location: form.location,
        cancelation: form.cancelation,
        sub_activity_id: form.sub_activity_id,
        address_id : address_id,
      });

      const instance_id = instanceRes.data.data.id;

      await axios.post("/api/pricings", {
        price: form.price,
        type: form.type,
        instance_activity_id: instance_id,
      });

      setForm({
        start: "",
        end: "",
        deadline: "",
        places: 0,
        nb_inscription: 0,
        debutHour: "",
        endHour: "",
        status: "",
        minutes: 0,
        debutSubscription: "",
        location: "",
        cancelation: "",
        sub_activity_id: "",
        civil_number: "",
        street_name: "",
        postal_code: "",
        city: "",
        province: "",
        country: "",
        address_description: "",
        price: 0,
        type: ""
      });

      fetchInstances();
    } catch (error) {
      console.error("Erreur lors de l'ajout:", error);
    }
  };

  const handleDelete = async (id) => {
    await axios.delete(`/api/instance_activities/${id}`);
    fetchInstances();
  };

  const renderField = (label, name, type = "text") => (
    <div className="flex flex-col">
      <label htmlFor={name} className="text-sm text-gray-600 mb-1">{label}</label>
      <input
        id={name}
        name={name}
        type={type}
        value={form[name]}
        onChange={handleChange}
        className="border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-10">
      <h1 className="text-3xl font-bold text-center text-blue-800">Gestion des Instances d'Activité</h1>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white p-6 shadow rounded-xl">
        <h2 className="col-span-full text-xl font-semibold text-gray-700">Détails de l'instance</h2>

        {renderField("Date de début", "start", "date")}
        {renderField("Date de fin", "end", "date")}
        {renderField("Date limite", "deadline", "date")}
        {renderField("Places disponibles", "places", "number")}
        {renderField("Heure de début", "debutHour", "time")}
        {renderField("Heure de fin", "endHour", "time")}
        {renderField("Statut", "status")}
        {renderField("Durée (minutes)", "minutes", "number")}
        {renderField("Début des inscriptions", "debutSubscription", "date")}
        {renderField("Lieu", "location")}
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="nb_inscription"
            name="nb_inscription"
            checked={form.nb_inscription === 0}
            onChange={(e) => {
              setForm({ ...form, nb_inscription: e.target.checked ? 0 : form.nb_inscription });
            }}
            className="w-4 h-4 text-blue-600"
          />
          <label htmlFor="nb_inscription" className="text-sm text-gray-600">
            Nombre d'inscriptions : cocher pour 0
          </label>
        </div>

        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="cancelation"
            name="cancelation"
            checked={form.cancelation === "0"}
            onChange={(e) => {
              setForm({ ...form, cancelation: e.target.checked ? "0" : form.cancelation });
            }}
            className="w-4 h-4 text-blue-600"
          />
          <label htmlFor="cancelation" className="text-sm text-gray-600">
            Politique d'annulation : cocher pour 0
          </label>
        </div>



  

        <div className="flex flex-col">
          <label htmlFor="sub_activity_id" className="text-sm text-gray-600 mb-1">Sous-activité</label>
          <select
            id="sub_activity_id"
            name="sub_activity_id"
            value={form.sub_activity_id}
            onChange={handleChange}
            className="border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="">-- Choisir une sous-activité --</option>
            {subActivities.map((sub) => (
              <option key={sub.id} value={sub.id}>{sub.name}</option>
            ))}
          </select>
        </div>

        <h2 className="col-span-full text-xl font-semibold text-gray-700 mt-6">Adresse</h2>

        {renderField("Numéro civique", "civil_number")}
        {renderField("Rue", "street_name")}
        {renderField("Code postal", "postal_code")}
        {renderField("Ville", "city")}
        {renderField("Province", "province")}
        {renderField("Pays", "country")}
        {renderField("Description", "address_description")}

        <h2 className="col-span-full text-xl font-semibold text-gray-700 mt-6">Tarification</h2>

        {renderField("Prix", "price", "number")}
        {renderField("Type de prix", "type")}

        <button type="submit" className="col-span-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">Ajouter</button>
      </form>

      <div className="bg-white p-6 shadow rounded-xl">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Instances existantes</h2>
        <ul className="space-y-2">
          {instances.map((inst) => (
            <li key={inst.id} className="flex justify-between items-center border-b py-2">
              <span className="text-gray-800">#{inst.id} - {inst.status} du {inst.start} au {inst.end}</span>
              <button onClick={() => handleDelete(inst.id)} className="text-red-600 hover:underline">Supprimer</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
