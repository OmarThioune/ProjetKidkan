import { useEffect, useState } from "react";
import axios from "axios";

export default function Sub() {
  const [form, setForm] = useState({
    name: "",
    min_age: 0,
    max_age: 0,
    description: "",
    material: "",
    level: "débutant", // Valeur par défaut
    activity_id: "",
  });

  const [categories, setCategories] = useState([]);
  const [subActivities, setSubActivities] = useState([]);
  const [filteredSubActivities, setFilteredSubActivities] = useState([]);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    // Charger les catégories
    axios.get("/api/sub_category")
      .then(res => setCategories(res.data.data))
      .catch(err => console.error("Erreur lors du chargement des catégories", err));

    // Charger les sous-activités
    axios.get("/api/sub_activities")
      .then(res => {
        setSubActivities(res.data.data);
        setFilteredSubActivities(res.data.data);
      })
      .catch(err => console.error("Erreur lors du chargement des sous-activités", err));
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/sub_activities", form);
      setSuccess(true);
      setForm({
        name: "",
        min_age: 0,
        max_age: 0,
        description: "",
        material: "",
        level: "débutant",
        activity_id: "",
      });

      // Recharger les sous-activités après ajout
      axios.get("/api/sub_activities")
        .then(res => {
          setSubActivities(res.data.data);
          setFilteredSubActivities(res.data.data);
        });
    } catch (error) {
      console.error("Erreur lors de l'ajout de la sous-activité", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cette sous-activité ?")) {
      try {
        await axios.delete(`/api/sub_activities/${id}`);
        setSubActivities(subActivities.filter(sub => sub.id !== id));
        setFilteredSubActivities(filteredSubActivities.filter(sub => sub.id !== id));
      } catch (error) {
        console.error("Erreur lors de la suppression de la sous-activité", error);
      }
    }
  };

  const handleFilter = (e) => {
    const query = e.target.value.toLowerCase();
    setFilteredSubActivities(subActivities.filter(sub =>
      sub.name.toLowerCase().includes(query)
    ));
  };

  const renderField = (label, name, type = "text") => (
    <div className="flex flex-col">
      <label htmlFor={name} className="mb-1 text-sm font-medium text-gray-600">{label}</label>
      <input
        type={type}
        id={name}
        name={name}
        value={form[name]}
        onChange={handleChange}
        className="border rounded-lg px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center text-blue-700 mb-6">Ajouter une Sous-activité</h1>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 shadow-lg rounded-xl">
        {renderField("Nom", "name")}
        {renderField("Âge minimum", "min_age", "number")}
        {renderField("Âge maximum", "max_age", "number")}
        {renderField("Matériel requis", "material")}
        {renderField("Niveau", "level")}
        
        <div className="flex flex-col md:col-span-2">
          <label htmlFor="description" className="mb-1 text-sm font-medium text-gray-600">Description</label>
          <textarea
            id="description"
            name="description"
            rows="3"
            value={form.description}
            onChange={handleChange}
            className="border rounded-lg px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          ></textarea>
        </div>

        <div className="flex flex-col md:col-span-2">
          <label htmlFor="activity_id" className="mb-1 text-sm font-medium text-gray-600">sous-catégorie</label>
          <select
            id="activity_id"
            name="activity_id"
            value={form.activity_id}
            onChange={handleChange}
            className="border rounded-lg px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="">-- Sélectionner une sous-catégorie --</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
        </div>

        <div className="md:col-span-2 flex justify-end space-x-4">
          <button
            type="reset"
            onClick={() => setForm({
              name: "",
              min_age: 0,
              max_age: 0,
              description: "",
              material: "",
              level: "débutant",
              activity_id: "",
            })}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 text-sm"
          >
            Réinitialiser
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
          >
            Ajouter
          </button>
        </div>
      </form>

      {success && (
        <div className="mt-4 p-4 bg-green-100 text-green-700 border border-green-400 rounded">
          ✅ Sous-activité ajoutée avec succès !
        </div>
      )}

      {/* Filtrage par nom */}
      <div className="mt-6 mb-4">
        <label htmlFor="search" className="block text-sm font-medium text-gray-600 mb-2">Rechercher par nom</label>
        <input
          type="text"
          id="search"
          onChange={handleFilter}
          placeholder="Rechercher une sous-activité"
          className="border rounded-lg px-3 py-2 w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* Liste des sous-activités */}
      <div className="mt-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Liste des Sous-activités</h2>
        <div className="space-y-4">
          {filteredSubActivities.map((sub) => (
            <div key={sub.id} className="bg-white p-4 shadow-md rounded-lg flex justify-between items-center">
              <div>
                <h3 className="font-semibold text-lg">{sub.name || 'Nom non disponible'}</h3>
                <p className="text-sm text-gray-600">Niveau: {sub.level || 'Non spécifié'}</p>
                <p className="text-sm text-gray-600">Catégorie: {sub.activity?.name || 'Non spécifiée'}</p>
              </div>
              <button
                onClick={() => handleDelete(sub.id)}
                className="text-red-600 hover:text-red-800 text-sm"
              >
                Supprimer
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
