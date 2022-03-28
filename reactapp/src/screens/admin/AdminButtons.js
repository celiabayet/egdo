import React, { useState, useEffect } from 'react';
import { Modal, Box, TextField, FormControl, FormGroup, FormControlLabel, FormLabel, InputLabel, Select, MenuItem, Checkbox, Radio, RadioGroup } from '@mui/material';
import '../../stylesheets/Modal.css';

export default function AdminButton(props) {
    let eventTypes = ["Atelier C.V.", "Coaching à l'embauche", "Sortie cinéma", "Sortie théâtre", "Atelier création", "Balade à vélo", "Evénement sportif", "Séance de natation", "Sortie au musée", "Autre"];
    let eventDetails = [{ label: "Le nom", mongoDB: "title" }, { label: "Le type d'événement", mongoDB: "type" }, { label: "La date", mongoDB: "date" }, { label: "Le lieu", mongoDB: "address" }, { label: "Le nombre maximal de participants", mongoDB: "maxNumberOfPeople" }, { label: "La description", mongoDB: "description" }]
    let audienceArray = ["Les enfants ou les élèves", "Les personnes en insertion", "Tout le monde"]

    const [open, setOpen] = useState(false);
    const [submit, setSubmit] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    // Récupérer tous les champs de saisie
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("");
    const [author, setAuthor] = useState("");
    const [img, setImg] = useState("");
    const [content, setContent] = useState("");
    const [date, setDate] = useState("");
    const [address, setAddress] = useState("");
    const [description, setDescription] = useState("");
    const [type, setType] = useState("");
    const [maxNumberOfPeople, setMaxNumberOfPeople] = useState(30);
    const [audience, setAudience] = useState("");
    const [articleToDelete, setArticleToDelete] = useState("");
    const [lastName, setLastName] = useState("");
    const [firstName, setFirstName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [telephone, setTelephone] = useState("");
    const [changeEvent, setChangeEvent] = useState([]);
    const [receiver, setReceiver] = useState('');
    const [object, setObject] = useState('');

    // Récupérer les éléments des collections de la BDD
    const [allArticles, setAllArticles] = useState([]);
    const [allEvents, setAllEvents] = useState([]);
    // const [allAdmins, setAllAdmins] = useState([]);

    useEffect(() => {
        async function getArticles() {
            var res = await fetch("/article/see-articles")
            res = await res.json();
            setAllArticles(res.articles);
        }
        getArticles();
        async function getEvents() {
            var res = await fetch("/event/see-events/see-all")
            res = await res.json();
            setAllEvents(res.events);
        }
        getEvents();
        // async function getAdmins() {
        //     var res = await fetch("/admin/see-admins")
        //     res = await res.json();
        //     setAllAdmins(res.admins);
        // }
        // getAdmins();
    }, [submit, open]);

    // Et maintenant, toutes les fonctions dynamisant les formulaires

    async function addArticle(title, img, content, author, category) {
        const newArticle = {
            title: title,
            img: img,
            content: content,
            author: author,
            category: category,
            date: new Date(),
            isNews: false
        };
        var res = await fetch("/article/add-article", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newArticle),
        });
        res = await res.json();
        console.log(res);

        setTitle(""); setCategory(""); setAuthor(""); setImg(""); setContent(""); setSubmit(!submit);
    };

    async function deleteArticle(title) {
        var res = await fetch(`/article/remove-article/${title}`, {
            method: 'DELETE'
        });
        res = await res.json();
        console.log(res);

        setArticleToDelete("");
        setSubmit(!submit);
    }

    async function addEvent(date, audience, type, title, address, maxNumberOfPeople, description) {
        const newEvent = {
            date: date,
            audience: audience == "Tout le monde" ? "all" : (audience == "Les enfants ou les élèves" ? "students" : "insertion"),
            type: type,
            title: title,
            address: address,
            maxNumberOfPeople: maxNumberOfPeople,
            description: description
        };
        var res = await fetch("/event/add-event", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newEvent),
        });
        res = await res.json();
        console.log(res);

        setDate(""); setAudience(""); setType(""); setTitle(""); setAddress(""); setMaxNumberOfPeople(30); setDescription(""); setSubmit(!submit);
    };

    async function updateEvent(date, type, title, address, maxNumberOfPeople, audience, description) {
        const newEvent = {
            date: date,
            type: type,
            title: title,
            address: address,
            maxNumberOfPeople: maxNumberOfPeople,
            audience: audience,
            description: description
        };
        var res = await fetch("/event/add-event", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newEvent),
        });
        res = await res.json();
        console.log(res);

        setDate(""); setType(""); setTitle(""); setAddress(""); setMaxNumberOfPeople(30); setAudience(""); setDescription(""); setSubmit(!submit);
    };

    async function deleteEvent(title, date) {
        let event = { title: title, date: date }
        var res = await fetch("/event/remove-event", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(event),
        });
        res = await res.json();
        console.log(res);

        setDate(""); setType(""); setTitle(""); setSubmit(!submit);
    }

    async function adminSignUp(lastName, firstName, email, password, telephone) {
        const newAdmin = {
            lastName: lastName,
            firstName: firstName,
            email: email,
            password: password,
            telephone: telephone
        };
        var res = await fetch("/admin/sign-up", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newAdmin),
        });
        res = await res.json();
        console.log(res);

        setLastName(""); setFirstName(""); setEmail(""); setPassword(""); setTelephone(""); setSubmit(!submit);
    }

    function contactDev() {
        setReceiver(''); setObject(''); setContent(''); setOpen(false);
    }

    // En fonction du bouton sur lequel on clique, un modal différent va apparaître.
    let modalShown;

    let formToSelectEvent = (
        <>
            <FormControl className="select-field">
                <InputLabel id="demo-simple-select-helper-label">Type d'événement</InputLabel>
                <Select labelId="demo-simple-select-helper-label" id="demo-simple-select-helper" value={type} label="Type d'événement à modifier" onChange={(e) => setType(e.target.value)}>
                    <MenuItem value=""><em>Aucun type sélectionné</em></MenuItem>
                    {eventTypes.map((type, i) => { return (<MenuItem value={type}>{type}</MenuItem>) })}
                </Select>
            </FormControl>
            <FormControl className="select-field">
                <InputLabel id="demo-simple-select-helper-label">Nom de l'événement</InputLabel>
                <Select labelId="demo-simple-select-helper-label" id="demo-simple-select-helper" value={title} label="Nom de l'événement à modifier" onChange={(e) => setTitle(e.target.value)}>
                    <MenuItem value=""><em>Aucun nom sélectionné</em></MenuItem>
                    {[...allEvents].filter(event => event.type == type).map((event, i) => { return (<MenuItem value={event.title}>{event.title}</MenuItem>) })}
                </Select>
            </FormControl>
            <FormControl className="select-field">
                <InputLabel id="demo-simple-select-helper-label">Date de l'événement</InputLabel>
                <Select labelId="demo-simple-select-helper-label" id="demo-simple-select-helper" value={date} label="Date de l'événement" onChange={(e) => setDate(e.target.value)}>
                    <MenuItem value=""><em>Aucune date sélectionné</em></MenuItem>
                    {[...allEvents].filter(event => event.type == type && event.title == title).map((event, i) => { return (<MenuItem value={event.date}>{event.date}</MenuItem>) })}
                </Select>
            </FormControl>
        </>)

    switch (props.title) {
        case "Ajouter un article":
            modalShown = (
                <div className="modal-container">
                    <div className="form-input">
                        <TextField id="outlined-basic" label="Titre de l'article" variant="outlined" className="input-field" onChange={(e) => setTitle(e.target.value)} value={title} />
                        <TextField id="outlined-basic" label="Catégorie" variant="outlined" className="input-field" onChange={(e) => setCategory(e.target.value)} value={category} />
                        <TextField id="outlined-basic" label="Nom de l'auteur" variant="outlined" className="input-field" onChange={(e) => setAuthor(e.target.value)} value={author} />
                        <TextField id="outlined-basic" label="Contenu" variant="outlined" multiline rows={9} className="input-field" onChange={(e) => setContent(e.target.value)} value={content} />
                    </div>
                    <input type="file" style={{ marginTop: "20px" }} onChange={(e) => setImg(e.target.value)} value={img} />
                    <button onClick={() => addArticle(title, img, content, author, category)} className="button-input">{props.title}</button>
                </div>)
            break;

        case "Supprimer un article":
            modalShown = (
                <div className="modal-container">
                    <FormControl className="select-field">
                        <InputLabel id="demo-simple-select-helper-label">Article à supprimer</InputLabel>
                        <Select labelId="demo-simple-select-helper-label" id="demo-simple-select-helper" value={articleToDelete} label="Article à supprimer" onChange={(e) => { setArticleToDelete(e.target.value) }}>
                            <MenuItem value=""><em>Aucun article sélectionné</em></MenuItem>
                            {[...allArticles].map((article, i) => { return (<MenuItem value={article.title}>{article.title}</MenuItem>) })}
                        </Select>
                    </FormControl>
                    <button onClick={() => deleteArticle(articleToDelete)} className="button-input">{props.title}</button>
                </div>)
            break;

        case "Ajouter un événement":
            modalShown = (
                <div className="modal-container">
                    <div className="form-input">
                        <TextField id="datetime-local" label="Date de l'événement" type="datetime-local" onChange={(e) => setDate(e.target.value)} value={date} className="input-field date-field" InputLabelProps={{ shrink: true }} />
                        <InputLabel id="demo-simple-select-helper-label" style={{ marginTop: 10 }}>Public visé par l'événement :</InputLabel>
                        <FormControl component="fieldset">
                            <RadioGroup aria-labelledby="demo-radio-buttons-group-label"
                                defaultValue="all"
                                name="radio-buttons-group" row>
                                {audienceArray.map((audienceElement, i) => {
                                    return (<FormControlLabel
                                        value={audienceElement}
                                        control={<Radio />}
                                        onChange={(e) => setAudience(e.target.value)}
                                        label={audienceElement}
                                        labelPlacement="end"
                                    />)
                                })}
                            </RadioGroup>
                        </FormControl>
                        <FormControl className="select-field">
                            <InputLabel id="demo-simple-select-helper-label">Type d'événement</InputLabel>
                            <Select labelId="demo-simple-select-helper-label" id="demo-simple-select-helper" value={type} label="Type d'événement" onChange={(e) => setType(e.target.value)}>
                                <MenuItem value=""><em>Aucun type sélectionné</em></MenuItem>
                                {eventTypes.map((type, i) => { return (<MenuItem value={type}>{type}</MenuItem>) })}
                            </Select>
                        </FormControl>
                        <TextField id="outlined-basic" label="Nom de l'événement" variant="outlined" className="input-field" onChange={(e) => setTitle(e.target.value)} value={title} />
                        <TextField id="outlined-basic" label="Lieu de l'événement" variant="outlined" className="input-field" onChange={(e) => setAddress(e.target.value)} value={address} />
                        <TextField id="outlined-basic" label="Nombre maximal de participants" variant="outlined" type="number" className="input-field" onChange={(e) => setMaxNumberOfPeople(e.target.value)} value={maxNumberOfPeople} />
                        <TextField id="outlined-basic" label="Description" variant="outlined" className="input-field" onChange={(e) => setDescription(e.target.value)} value={description} multiline rows={5} />
                    </div>
                    <button onClick={() => addEvent(date, audience, type, title, address, maxNumberOfPeople, description)} className="button-input">{props.title}</button>
                </div>)
            break;

        case "Modifier un événement":
            modalShown = (
                <div className="modal-container">

                    {/* ETape 1 */}
                    <div className="form-input">
                        <h6 style={{ paddingTop: 4 }}>Quel événement souhaitez-vous modifer ?</h6>
                        {formToSelectEvent}
                    </div>
                    {/* Etape 2 */}
                    {/* A changer  */}

                    {/* <div className="form-input" style={{ display: date === "" ? "none" : "" }}>
                        <h6 style={{ marginTop: 10 }}>Dans cet événement, que souhaitez-vous changer ?</h6>
                        <FormControl component="fieldset" style={{ display: date === "" ? "none" : "" }}>
                            <FormGroup aria-label="position" column>
                                {eventDetails.map((detail, i) => {
                                    return (<FormControlLabel
                                        value={detail.mongoDB}
                                        control={<Checkbox />}
                                        onChange={(e) => { e.target.checked ? setChangeEvent([...detail.mongoDB]) : setChangeEvent(changeEvent.filter(charac => charac.mongoDB !== detail.mongoDB)) }}
                                        label={detail.label}
                                        labelPlacement="end"
                                    />)
                                })}
                            </FormGroup>
                        </FormControl>
                    </div> */}
                    <button onClick={() => updateEvent(title, date)} className="button-input">{props.title}</button>
                </div>)
            break;

        case "Supprimer un événement":
            modalShown = (
                <div className="modal-container">
                    <div className="form-input">
                        {formToSelectEvent}
                    </div>
                    <button onClick={() => deleteEvent(title, date)} className="button-input">{props.title}</button>
                </div>)
            break;

        case "Ajouter un administrateur":
            modalShown = (
                <div className="modal-container">
                    <div className="form-input">
                        <TextField id="outlined-basic" label="Nom" variant="outlined" className="input-field" onChange={(e) => setLastName(e.target.value)} value={lastName} />
                        <TextField id="outlined-basic" label="Prénom" variant="outlined" className="input-field" onChange={(e) => setFirstName(e.target.value)} value={firstName} />
                        <TextField id="outlined-basic" label="Email" variant="outlined" className="input-field" onChange={(e) => setEmail(e.target.value)} value={email} />
                        <TextField id="outlined-basic" label="Mot de passe" variant="outlined" className="input-field" onChange={(e) => setPassword(e.target.value)} value={password} />
                        <TextField id="outlined-basic" label="N° de téléphone" variant="outlined" className="input-field" onChange={(e) => setTelephone(e.target.value)} value={telephone} />
                    </div>
                    <button onClick={() => adminSignUp(lastName, firstName, email, password, telephone)} className="button-input">{props.title}</button>
                </div>)
            break;

        case "Contacter un développeur":
            modalShown = (
                <div className="modal-container">
                    <div className="form-input">
                        <FormControl>
                            <FormLabel id="demo-row-radio-buttons-group-label">Qui souhaitez-vous contacter ?</FormLabel>
                            <RadioGroup
                                row
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="row-radio-buttons-group"
                            >
                                <FormControlLabel value="celia.bayet@gmail.com" control={<Radio />} label="Célia Bayet" onChange={(e) => setReceiver(e.target.value)} />
                                <FormControlLabel value="jsebbari@gmail.com" control={<Radio />} label="Jamal Sebbari" onChange={(e) => setReceiver(e.target.value)} />
                                <FormControlLabel value="romain.defouilhoux@pm.me" control={<Radio />} label="Romain Defouilhoux" onChange={(e) => setReceiver(e.target.value)} />
                                <FormControlLabel value="celia.bayet@gmail.com,jsebbari@gmail.com,romain.defouilhoux@pm.me" control={<Radio />} label="Peu importe" onChange={(e) => setReceiver(e.target.value)} />
                            </RadioGroup>
                        </FormControl>
                        <TextField id="outlined-basic" label="Objet du message" variant="outlined" className="input-field" onChange={(e) => setObject(e.target.value)} value={object} />
                        <TextField id="outlined-basic" label="Contenu" variant="outlined" multiline rows={9} className="input-field" onChange={(e) => setContent(e.target.value)} value={content} />
                    </div>
                    <a href={`mailto:${receiver}?&subject=${object}&body=${content}`}><button className="button-input" onClick={contactDev}>Envoyer depuis mon adresse email</button></a>
                </div >)
            break;

        default:
            modalShown = (<TextField id="outlined-basic" label="Défaut" variant="outlined" className="input-field" />)
    }

    return (
        <>
            <button className="button-admin" onClick={handleOpen}>{props.title}</button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box className="custom-modal">
                    <h3>Vous souhaitez {props.title.toLowerCase()}...</h3>
                    {modalShown}
                </Box>
            </Modal>
        </>
    )
}